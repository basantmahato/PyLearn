import s1 from "./sample1.json";
import s2 from "./sample2.json";
import s3 from "./sample3.json";
import s4 from "./sample4.json";
import s5 from "./sample5.json";
import s6 from "./sample6.json";
import s7 from "./sample7.json";
import s8 from "./sample8.json";
import s9 from "./sample9.json";
import s10 from "./sample10.json";
import s11 from "./sample11.json";
import s12 from "./sample12.json";
import s13 from "./sample13.json";
import s14 from "./sample14.json";
import s15 from "./sample15.json";
import s16 from "./sample16.json";
import s17 from "./sample17.json";
import s18 from "./sample18.json";
import s19 from "./sample19.json";
import s20 from "./sample20.json";

export const SAMPLE_PAPERS = [
  s1, s2, s3, s4, s5, s6, s7, s8, s9, s10,
  s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
];

export const getPaperById = (id: string) =>
  SAMPLE_PAPERS.find((p) => p.paperId === id);

export type Paper = typeof s1;
export type Section = typeof s1.sections[0];
export type Question = Section["questions"][0];
