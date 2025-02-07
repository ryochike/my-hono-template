import type { SampleItem } from "./sample.domain";

export const getAllSamples = async (): Promise<SampleItem[]> => {
  const sampleData = [
    {
      id: "1",
      title: "Sample 1",
      content: "Content 1",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Sample 2",
      content: "Content 2",
      createdAt: new Date(),
    },
  ];

  return sampleData;
};

export const getSampleById = async (id: string): Promise<SampleItem> => {
  console.log(id);

  const item = {
    id: "1",
    title: "Sample 1",
    content: "Content 1",
    createdAt: new Date(),
  };

  return item;
};
