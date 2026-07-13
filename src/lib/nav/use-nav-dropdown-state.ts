"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Grace period for moving cursor from nav trigger into the mega menu panel */
const CLOSE_DELAY_MS = 200;

function useHoverMenusEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return enabled;
}

export type NavDropdownState = {
  activeMenu: string | null;
  isPinned: boolean;
  hoverEnabled: boolean;
  isMenuOpen: (href: string) => boolean;
  isMenuPinned: (href: string) => boolean;
  handleTriggerEnter: (href: string) => void;
  handleTriggerLeave: () => void;
  /** Returns true when the trigger should navigate to its landing page. */
  handleTriggerClick: (href: string) => boolean;
  handleTriggerKeyDown: (href: string, event: React.KeyboardEvent) => boolean;
  handlePanelEnter: () => void;
  handlePanelLeave: () => void;
  handleNavLeave: () => void;
  close: () => void;
};

export function useNavDropdownState(): NavDropdownState {
  const hoverEnabled = useHoverMenusEnabled();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPinnedRef = useRef(isPinned);
  const activeMenuRef = useRef(activeMenu);

  useEffect(() => {
    isPinnedRef.current = isPinned;
  }, [isPinned]);

  useEffect(() => {
    activeMenuRef.current = activeMenu;
  }, [activeMenu]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    activeMenuRef.current = null;
    isPinnedRef.current = false;
    setActiveMenu(null);
    setIsPinned(false);
  }, [clearCloseTimer]);

  const openNow = useCallback(
    (href: string) => {
      clearCloseTimer();
      activeMenuRef.current = href;
      setActiveMenu(href);
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    if (isPinnedRef.current) return;
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      activeMenuRef.current = null;
      setActiveMenu(null);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const cancelClose = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const handleTriggerEnter = useCallback(
    (href: string) => {
      if (!hoverEnabled) return;
      clearCloseTimer();
      activeMenuRef.current = href;
      setActiveMenu(href);
    },
    [hoverEnabled, clearCloseTimer],
  );

  const handleTriggerLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const handlePanelEnter = useCallback(() => {
    cancelClose();
  }, [cancelClose]);

  const handlePanelLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const handleNavLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const handleTriggerClick = useCallback(
    (href: string): boolean => {
      clearCloseTimer();
      if (activeMenuRef.current === href && isPinnedRef.current) {
        close();
        return true;
      }
      isPinnedRef.current = true;
      setIsPinned(true);
      openNow(href);
      return false;
    },
    [clearCloseTimer, close, openNow],
  );

  const handleTriggerKeyDown = useCallback(
    (href: string, event: React.KeyboardEvent): boolean => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        return handleTriggerClick(href);
      }
      return false;
    },
    [handleTriggerClick],
  );

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    if (!activeMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeMenu, close]);

  return {
    activeMenu,
    isPinned,
    hoverEnabled,
    isMenuOpen: (href: string) => activeMenu === href,
    isMenuPinned: (href: string) => activeMenu === href && isPinned,
    handleTriggerEnter,
    handleTriggerLeave,
    handleTriggerClick,
    handleTriggerKeyDown,
    handlePanelEnter,
    handlePanelLeave,
    handleNavLeave,
    close,
  };
}
