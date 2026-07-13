import type { ContentLocale, LocaleContentPack } from "../types";
import { mergeContent } from "../merge-content";
import { legacyContentPacks } from "../legacy-packs";
import { arPack } from "./ar";
import { dePack } from "./de";
import { esPack } from "./es";
import { fjPack } from "./fj";
import { frPack } from "./fr";
import { hiPack } from "./hi";
import { idPack } from "./id";
import { itPack } from "./it";
import { jaPack } from "./ja";
import { koPack } from "./ko";
import { msPack } from "./ms";
import { nlPack } from "./nl";
import { ptPack } from "./pt";
import { ruPack } from "./ru";
import { thPack } from "./th";
import { zhPack } from "./zh";

const emptyPack: LocaleContentPack = {
  guides: {},
  destinations: {},
  experiences: {},
  deals: {},
  resorts: {},
};

function buildLocalePack(
  full: Partial<LocaleContentPack>,
  legacy?: Partial<LocaleContentPack>,
): LocaleContentPack {
  let pack = mergeContent(emptyPack, legacy ?? {});
  pack = mergeContent(pack, full);
  return pack;
}

const localeFullPacks: Record<ContentLocale, Partial<LocaleContentPack>> = {
  fj: fjPack,
  hi: hiPack,
  zh: zhPack,
  ja: jaPack,
  ko: koPack,
  fr: frPack,
  de: dePack,
  es: esPack,
  pt: ptPack,
  it: itPack,
  ar: arPack,
  ru: ruPack,
  th: thPack,
  id: idPack,
  ms: msPack,
  nl: nlPack,
};

export const allContentPacks: Partial<Record<ContentLocale, LocaleContentPack>> =
  Object.fromEntries(
    (Object.keys(localeFullPacks) as ContentLocale[]).map((locale) => [
      locale,
      buildLocalePack(
        localeFullPacks[locale],
        legacyContentPacks[locale] as Partial<LocaleContentPack> | undefined,
      ),
    ]),
  );

export {
  CONTENT_DESTINATION_SLUGS,
  CONTENT_GUIDE_SLUGS,
  CONTENT_EXPERIENCE_SLUGS,
  CONTENT_DEAL_SLUGS,
  CONTENT_RESORT_SLUGS,
} from "./slugs";
