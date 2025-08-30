export type DrawingItem = {
  id: string;
  title: string;
  discipline: "Arch" | "Interior" | "MEP";
  client: string;
  siteAddress: string;
  pdfLink: string;
  previewImage?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Interiors" | "Landscape";
  coverImage: string;
  gallery: string[];
  location?: string;
  year?: number;
  pdfLink?: string;
};

export const FEATURED_IMAGES: { src: string; alt: string }[] = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Fee9dc9332cbd4c1b8432291046af7440?format=webp&width=1000",
    alt: "Landscaping plan visual",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F841074a8b7b848f1bf883bc3adb05a5d?format=webp&width=1000",
    alt: "3D residence view",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Ff90101c2efe4487fbc6a0dddae936760?format=webp&width=1000",
    alt: "Landscaping plan view 2",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F18a43c88d1fa46f1842980425be7369c?format=webp&width=800",
    alt: "Studio snapshot",
  },
  {
    src: "/placeholder.svg",
    alt: "Architectural drawing placeholder",
  },
  {
    src: "/placeholder.svg",
    alt: "Interior drawing placeholder",
  },
];

export const DRAWINGS: DrawingItem[] = [
  {
    id: "kitchen-wall-c",
    title: "Kitchen Wall – Detail C",
    discipline: "Arch",
    client: "Private Residence",
    siteAddress: "Sonipat, Haryana",
    pdfLink:
      "https://cdn.builder.io/o/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F00b95a70dcf04b4b9b044ca5c21aeada?alt=media&token=18e2ee2a-9c67-4006-86b7-6be82da4c684&apiKey=e9a77209c0ab4c10a9cc4ef22c9de513",
    previewImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F841074a8b7b848f1bf883bc3adb05a5d?format=webp&width=800",
  },
  {
    id: "front-elevation-gamma-114",
    title: "Front Elevation – Gamma-114",
    discipline: "Arch",
    client: "Residence 114",
    siteAddress: "Rohtak, Haryana",
    pdfLink:
      "https://cdn.builder.io/o/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Fc8f12cb4e38e4a7883f6af301856ddc7?alt=media&token=7e7be819-766e-4c3e-be2d-3230e7a8bba5&apiKey=e9a77209c0ab4c10a9cc4ef22c9de513",
    previewImage: "https://cdn.builder.io/api/v1/image/assets%2F35722aca644e46f1b9b3ff888b3c357d%2Fb7f9c4d36a3b4c46b84bf796ff83f7bd?format=webp&width=800",
  },
  {
    id: "boundary-wall-gamma-114",
    title: "Boundary Wall – Gamma-114",
    discipline: "Arch",
    client: "Residential Plot",
    siteAddress: "Gamma-114",
    pdfLink:
      "https://cdn.builder.io/o/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F409315b83f884260b688c94128edd72e?alt=media&token=b700fda0-4c24-45c4-a0d9-31ab135a9c7b&apiKey=e9a77209c0ab4c10a9cc4ef22c9de513",
    previewImage:
      "https://cdn.builder.io/api/v1/image/assets%2F35722aca644e46f1b9b3ff888b3c357d%2F9b8216ee231242a4a6e7c5dcb5ff44f9?format=webp&width=800",
  },
  {
    id: "electrical-1356p",
    title: "Electrical Layout – Residence 1356P",
    discipline: "MEP",
    client: "Residence 1356P",
    siteAddress: "Delhi NCR",
    pdfLink:
      "https://cdn.builder.io/o/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F7a75d21c9c4b41bba2a16fd823122bd6?alt=media&token=43ddd446-8317-4af7-bcf8-8a17bb75ed39&apiKey=e9a77209c0ab4c10a9cc4ef22c9de513",
    previewImage:
      "https://cdn.builder.io/api/v1/image/assets%2F35722aca644e46f1b9b3ff888b3c357d%2F28b8620a8ed043c1a85ac0771d89edea?format=webp&width=800",
  },
  {
    id: "sewer-h119",
    title: "Sewer/Sanitary Plan – H-119",
    discipline: "MEP",
    client: "House H-119",
    siteAddress: "Sonipat, Haryana",
    pdfLink:
      "https://cdn.builder.io/o/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Fd59680ad337347eea51b597ce83f07e5?alt=media&token=282dd7bd-bc1a-4c25-bd02-15808c4e641f&apiKey=e9a77209c0ab4c10a9cc4ef22c9de513",
    previewImage:
      "https://cdn.builder.io/api/v1/image/assets%2F35722aca644e46f1b9b3ff888b3c357d%2Ff48cf6aa0b5241c2ad4731d14c6b3195?format=webp&width=800",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "landscape-park",
    title: "Landscape Layout – Suncity",
    category: "Landscape",
    coverImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Fee9dc9332cbd4c1b8432291046af7440?format=webp&width=1000",
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Fee9dc9332cbd4c1b8432291046af7440?format=webp&width=1600",
    ],
    location: "Rohtak",
  },
  {
    id: "residence-3d",
    title: "Residence Interior 3D",
    category: "Interiors",
    coverImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F841074a8b7b848f1bf883bc3adb05a5d?format=webp&width=1000",
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F841074a8b7b848f1bf883bc3adb05a5d?format=webp&width=1600",
    ],
    location: "NCR",
  },
  {
    id: "front-elevation",
    title: "Front Elevation – Gamma-114",
    category: "Residential",
    coverImage: "/placeholder.svg",
    gallery: ["/placeholder.svg"],
    pdfLink:
      "https://cdn.builder.io/o/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2Fc8f12cb4e38e4a7883f6af301856ddc7?alt=media&token=7e7be819-766e-4c3e-be2d-3230e7a8bba5&apiKey=e9a77209c0ab4c10a9cc4ef22c9de513",
  },
  {
    id: "kitchen-detail",
    title: "Kitchen Wall – Detail C",
    category: "Residential",
    coverImage:
      "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F841074a8b7b848f1bf883bc3adb05a5d?format=webp&width=800",
    gallery: [
      "https://cdn.builder.io/api/v1/image/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F841074a8b7b848f1bf883bc3adb05a5d?format=webp&width=1600",
    ],
    pdfLink:
      "https://cdn.builder.io/o/assets%2Fe9a77209c0ab4c10a9cc4ef22c9de513%2F00b95a70dcf04b4b9b044ca5c21aeada?alt=media&token=18e2ee2a-9c67-4006-86b7-6be82da4c684&apiKey=e9a77209c0ab4c10a9cc4ef22c9de513",
  },
];
