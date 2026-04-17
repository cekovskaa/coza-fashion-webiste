export interface BannerContent {
  preTitle: string;
  title: string;
}

export interface Product {
  id: string;
  price: string;
  title: string;
  gender: "man" | "women";
  img: string;
  description: string;
}

export interface Blog {
  id: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  img: string;
  title: string;
  first_content: string;
  second_content: string;
}

export interface About {
  title: string;
  first_content: string;
  second_content: string;
  third_content: string;
  first_image: string;
  second_image: string;
  second_title: string;
  fourth_content: string;
  fifth_content: string;
  author: string;
}
