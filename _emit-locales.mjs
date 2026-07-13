import { writeFileSync } from "fs";
import { ru } from "./_locales-ru.mjs";
import { th } from "./_locales-th.mjs";
import { id } from "./_locales-id.mjs";
import { ms } from "./_locales-ms.mjs";
import { nl } from "./_locales-nl.mjs";

const sections = {
  home: [
    "planGuide1Title", "planGuide1Desc", "planGuide2Title", "planGuide2Desc",
    "planGuide3Title", "planGuide3Desc", "planGuide4Title", "planGuide4Desc",
    "planGuide5Title", "planGuide5Desc", "planGuide6Title", "planGuide6Desc",
  ],
  advisory: ["message", "close"],
  pages: [
    "destinationsCount", "destinationsCompare", "experiencesEyebrow", "experiencesSubtitle",
    "experiencesSearch", "experiencesCuratedCount", "experiencesAcross", "exploreAllExperiences",
    "featuredExperience", "islandHoppingTitle", "islandHoppingDesc", "exploreThisExperience",
    "getInspired", "momentsTitle", "allExperiences", "stayInspired", "stayInspiredSub",
    "contactConciergeOffers", "staysRating", "guidesEyebrow", "guidesExpertCount", "guidesUpdated",
    "guidesConcierge", "guidesFeaturedVisaTitle", "guidesFeaturedVisaDesc", "guidesMatching",
    "guidesSingle", "guidesEssentialEyebrow", "guidesEssentialTitle", "guidesEssentialSub",
    "guidesEssentialWeather", "guidesEssentialWeatherDesc", "guidesEssentialTransport",
    "guidesEssentialTransportDesc", "guidesEssentialDest", "guidesEssentialDestDesc",
    "guidesFaqEyebrow", "guidesFaqTitle", "guidesItineraryTitle", "guidesItinerarySub",
    "guidesNewsletterEyebrow", "guidesNewsletterTitle", "guidesNewsletterSub", "guidesContactConcierge",
    "thingsToKnowTitle", "itinerariesTitle", "itinerariesSubtitle", "loadMoreItineraries",
    "viewItinerary", "eventsBreadcrumb",
  ],
  guidesPage: [
    "categoryPlanningTitle", "categoryPlanningSub", "categoryStyleTitle", "categoryStyleSub",
    "categoryActivitiesTitle", "categoryActivitiesSub", "faqQ1", "faqA1", "faqQ2", "faqA2",
    "faqQ3", "faqA3", "valueExpertTitle", "valueExpertDesc", "valueAccurateTitle", "valueAccurateDesc",
    "valueLuxuryTitle", "valueLuxuryDesc", "valuePlanningTitle", "valuePlanningDesc",
  ],
  experiences: [
    "filterAdventure", "filterCulture", "filterFood", "filterNature", "filterFamily", "filterRomance",
    "filterWellness", "filterCruising", "thrillingTitle", "thrillingDesc", "snorkelTitle", "snorkelDesc",
    "divingTitle", "divingDesc", "surfingTitle", "surfingDesc", "explorePrefix", "valueGuidesTitle",
    "valueGuidesDesc", "valueCuratedTitle", "valueCuratedDesc", "valueOceanTitle", "valueOceanDesc",
    "valuePrivateTitle", "valuePrivateDesc",
  ],
  stays: [
    "catLuxuryTitle", "catLuxuryDesc", "catVillasTitle", "catVillasDesc", "catIslandTitle", "catIslandDesc",
    "catOverwaterTitle", "catOverwaterDesc", "valueHandpickedTitle", "valueHandpickedDesc", "valuePriceTitle",
    "valuePriceDesc", "valueFlexibleTitle", "valueFlexibleDesc", "valueConciergeTitle", "valueConciergeDesc",
  ],
  events: [
    "eyebrow", "subtitle", "curatedCount", "conciergeAccess", "featured", "requestVip", "filterType",
    "event", "events", "empty", "showAll", "planEyebrow", "planTitle", "planSub", "attendingTitle",
    "attendingSub", "updatesEyebrow", "updatesTitle", "updatesSub", "contactConcierge",
  ],
  faq: [
    "subtitle", "breadcrumbThings", "breadcrumbFaq", "catPlanning", "catAccommodation", "catTransport",
    "catDestinations", "catSafety", "catCurrency", "mostAsked", "visaQuestion", "visaAnswer",
    "searchPlaceholder", "popularTags", "tagVisa", "tagWeather", "tagAccommodation", "tagTransport",
    "tagActivities", "tagSafety", "browseGuides", "needHelp", "needHelpSub", "contactSupport",
    "exploreResources", "destGuidesTitle", "destGuidesDesc", "travelTipsTitle", "travelTipsDesc",
    "advisoriesTitle", "advisoriesDesc", "exploreCta", "newsletterTitle", "newsletterSub",
    "q1", "a1", "q2", "a2", "q3", "a3", "q4", "a4", "q5", "a5", "q6", "a6", "q7", "a7", "q8", "a8",
    "q9", "a9", "q10", "a10", "q11", "a11", "q12", "a12", "q13", "a13",
  ],
  itineraries: [
    "islandParadiseTitle", "islandParadiseDesc", "coralCoastTitle", "coralCoastDesc", "luxuryEscapeTitle",
    "luxuryEscapeDesc", "familyFunTitle", "familyFunDesc", "honeymoonTitle", "honeymoonDesc", "cultureTitle",
    "cultureDesc", "days7", "days5", "days10", "days8", "days6", "regionMamanucaYasawa", "regionCoralCoast",
    "regionDenarauMamanuca", "regionDenarauCoral", "regionYasawa", "regionVitiLevu",
  ],
  thingsToKnow: [
    "eyebrow", "title", "subtitle", "featuredGuide", "visaTitle", "visaDesc", "readGuide", "readGuideCta",
    "weatherTitle", "weatherDesc", "transportTitle", "transportDesc", "destGuideTitle", "destGuideDesc",
    "exploreDestCta", "adventureTitle", "adventureDesc", "essentialTitle", "essentialDesc", "honeymoonTitle",
    "honeymoonDesc", "healthTitle", "healthDesc", "luxuryTitle", "luxuryDesc", "transitTitle", "transitDesc",
    "viewAllGuides", "valuePlanningTitle", "valuePlanningDesc", "valueSafetyTitle", "valueSafetyDesc",
    "valueCultureTitle", "valueCultureDesc", "valueIslandTitle", "valueIslandDesc",
  ],
  about: ["eyebrow", "title", "p1", "p2", "p3", "cta"],
  contact: [
    "eyebrow", "title", "subtitle", "firstName", "lastName", "emailAddress", "dreamEscape",
    "preferTalkTitle", "preferTalkSub",
  ],
  login: ["subtitle", "password", "noAccount", "contactToRegister"],
  detail: [
    "thingsToDo", "placesToStay", "toursExperiences", "bestBeaches", "dining", "gettingAround",
    "localCulture", "interactiveMap", "interactiveMapNote", "reviews", "bestPriceGuarantee",
    "freeCancellation", "requestItinerary", "travelPlanningHub", "readyToPlan", "readyToPlanSub",
    "travelGuides", "experiences", "destinations", "enquireNow", "perNight",
  ],
  deals: [
    "breadcrumb", "eyebrow", "title", "subtitle", "curatedOffers", "bestPrice", "featuredPrefix",
    "enquireNow", "offersIn", "offer", "offers", "trustBestPrice", "trustMemberRates", "trustFlexible",
    "trustConcierge", "whyBookEyebrow", "whyBookTitle", "whyBookSub", "travelGuides", "customPackageTitle",
    "customPackageSub", "memberEyebrow", "memberTitle", "memberSub", "contactConcierge",
  ],
  trust: ["expertGuides", "bestPrice", "concierge", "verified"],
};

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function fmtValue(key, value) {
  if (value.length > 60 || value.includes("\n")) {
    return `${key}:\n        "${esc(value)}",`;
  }
  return `${key}: "${esc(value)}",`;
}

function fmtLocale(code, data) {
  const lines = [`  ${code}: {`];
  for (const [sec, keys] of Object.entries(sections)) {
    lines.push(`    ${sec}: {`);
    for (const k of keys) {
      const v = data[sec][k];
      const pad = "      ";
      if (v.length > 60) {
        lines.push(`${pad}${k}:`);
        lines.push(`${pad}  "${esc(v)}",`);
      } else {
        lines.push(`${pad}${k}: "${esc(v)}",`);
      }
    }
    lines.push("    },");
  }
  lines.push("  },");
  return lines.join("\n");
}

const locales = { ru, th, id, ms, nl };
let out = "";
for (const code of ["ru", "th", "id", "ms", "nl"]) {
  out += fmtLocale(code, locales[code]) + "\n";
}

writeFileSync("_locale-blocks-output.ts", out);
console.log("Written", out.split("\n").length, "lines");
