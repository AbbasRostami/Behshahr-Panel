import { Mail, Home, Airplay, Circle, User } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "مدیریت کاربران",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "articles",
    title: "مدیریت اخبار و مقالات",
    icon: <User size={20} />,
    children: [
      {
        id: "Articles-list",
        title: "لیست اخبار و مقالات",
        icon: <Circle size={12} />,
        navLink: "/articles-list",
      },
      {
        id: "Articles-add",
        title: "افزودن اخبار و مقالات",
        icon: <Circle size={12} />,
        navLink: "/articles-add",
      },
      
    ],
  },
];
