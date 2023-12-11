import dayjs from "dayjs";

export const seedFilmData = [
  {
    id: 1,
    title: "Outdated cache film title",
    slug: "outdated-cache-film-title",
    content: { data: "Outdated cache film opening crawl" },
    createdAt: dayjs().subtract(2, "day").toDate(),
    updatedAt: dayjs().subtract(2, "day").toDate(),
  },
  {
    id: 456,
    title: "Up to date cache film title",
    slug: "up-to-date-cache-film-title",
    content: { data: "Up to date cache film opening crawl" },
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  },
];
