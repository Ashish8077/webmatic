import { DEFAULT_MISSION_VISION_CONTENT, type MissionVisionContentValues } from "@/features/page-sections/schemas/mission-vision.schema";

interface LegacyMissionVisionContent {
  mission?: MissionVisionContentValues['mission'];
  vision?: MissionVisionContentValues['vision'];
  missionTitle?: string;
  missionDescription?: string;
  visionTitle?: string;
  visionDescription?: string;
}

export function mapMissionVisionContent(data: LegacyMissionVisionContent | null | undefined): MissionVisionContentValues {
  // Gracefully map legacy structure to the new domain model
  const mission = data?.mission ?? {
    title: data?.missionTitle ?? DEFAULT_MISSION_VISION_CONTENT.mission.title,
    description: data?.missionDescription ?? DEFAULT_MISSION_VISION_CONTENT.mission.description,
    visual: DEFAULT_MISSION_VISION_CONTENT.mission.visual,
  };

  const vision = data?.vision ?? {
    title: data?.visionTitle ?? DEFAULT_MISSION_VISION_CONTENT.vision.title,
    description: data?.visionDescription ?? DEFAULT_MISSION_VISION_CONTENT.vision.description,
    visual: DEFAULT_MISSION_VISION_CONTENT.vision.visual,
  };

  return { mission, vision };
}
