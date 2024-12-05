import { Mail, Home, Airplay, Circle, User, Server, Move, Menu } from "react-feather";

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
    navLink: "/users",
  },

  {
    id: "Courses",
    title: "مدیریت دوره",
    icon: <User size={20} />,
    children: [
      {
        id: "list",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/courses-list",
      },
      {
        id: "view",
        title: "افزودن دوره",
        icon: <Circle size={12} />,
        navLink: "/courses-add",
      },
    ],
  },
  {
    id: "Articles",
    title: "مدیریت اخبار و مقالات",
    icon: <Server size={20} />,
    children: [
      {
        id: "list",
        title: "لیست اخبار و مقالات",
        icon: <Menu size={30} />,
        navLink: "/articles-list",
      },
      {
        id: "add",
        title: "افزدون اخبار و مقاله",
        icon: <Move size={30} />,
        navLink: "/articles-add",
      },
    ],
  },
  {
    id: "comment",
    title: "مدیریت کامنت ها",
    icon: <Mail size={20} />,
    navLink: "/comments",
  },
];
