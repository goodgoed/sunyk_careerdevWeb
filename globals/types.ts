export type optionType = {
  type: string;
};

export type contentType = {
  id: string;
  title: string;
  type: string;
  deadline: string;
  date: string;
  major: string;
  images: string[];
};

export type docContentType = {
  id: string;
  title: string;
  type: string;
  deadline: {
    seconds: number;
  };
  date: {
    seconds: number;
  };
  major: string;
};
