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
];
