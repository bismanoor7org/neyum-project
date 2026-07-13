/**
 * CMS data facade — PostgreSQL when configured, JSON store otherwise.
 */
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import * as cms from "@/server/services/cms/cms.service";

export const isCmsDatabaseMode = () => isDatabaseConfigured();

export const getCmsDashboardStats = cms.getCmsDashboardStats;

export const getSeoMeta = cms.getSeoMeta;
export const upsertSeoMeta = cms.upsertSeoMeta;
export const listSeoMeta = cms.listSeoMeta;

export const listHomepageSections = cms.listHomepageSections;
export const upsertHomepageSection = cms.upsertHomepageSection;
export const listBanners = cms.listBanners;
export const createBanner = cms.createBanner;
export const updateBanner = cms.updateBanner;

export const listDestinationsCms = cms.listDestinationsCms;
export const getDestinationCms = cms.getDestinationCms;
export const createDestinationCms = cms.createDestinationCms;
export const updateDestinationCms = cms.updateDestinationCms;

export const listGuidesCms = cms.listGuidesCms;
export const getGuideCms = cms.getGuideCms;
export const createGuideCms = cms.createGuideCms;
export const updateGuideCms = cms.updateGuideCms;
export const deleteGuideCms = cms.deleteGuideCms;

export const listFaqsCms = cms.listFaqsCms;
export const createFaqCms = cms.createFaqCms;
export const updateFaqCms = cms.updateFaqCms;
export const deleteFaqCms = cms.deleteFaqCms;

export const listTestimonialsCms = cms.listTestimonialsCms;
export const createTestimonialCms = cms.createTestimonialCms;
export const updateTestimonialCms = cms.updateTestimonialCms;

export const deleteTestimonialCms = cms.deleteTestimonialCms;
export const getTestimonialCms = cms.getTestimonialCms;

export const listToursCms = cms.listToursCms;
export const getTourCms = cms.getTourCms;
export const createTourCms = cms.createTourCms;
export const updateTourCms = cms.updateTourCms;
export const deleteTourCms = cms.deleteTourCms;

export const listTransportCms = cms.listTransportCms;
export const getTransportCms = cms.getTransportCms;
export const createTransportCms = cms.createTransportCms;
export const updateTransportCms = cms.updateTransportCms;
export const deleteTransportCms = cms.deleteTransportCms;

export const listMediaAssets = cms.listMediaAssets;
export const listMediaFolders = cms.listMediaFolders;
export const getMediaStorageStats = cms.getMediaStorageStats;
export const findMediaUsage = cms.findMediaUsage;
export const createMediaAsset = cms.createMediaAsset;
export const updateMediaAsset = cms.updateMediaAsset;
export const deleteMediaAsset = cms.deleteMediaAsset;
export const bulkMediaAction = cms.bulkMediaAction;

export const listSupplierSubmissions = cms.listSupplierSubmissions;
export const reviewSupplierSubmission = cms.reviewSupplierSubmission;

export * from "@/server/services/cms/cms-extended.service";
