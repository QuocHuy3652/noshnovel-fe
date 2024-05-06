export interface Author {
  name: string;
  slug: string | null;
}

export interface Genre {
  name: string;
  slug: string;
}

export interface Novel {
  title: string;
  author: Author | null;
  coverImage: string;
  genres: Genre[] | null;
  novelSlug: string;
  status: string | null;
  description: string | null;
  totalChapter: number;
}
