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
    id: "comment",
    title: "مدیریت کامنت ها",
    icon: <Mail size={20} />,
    navLink: "/comments",
  },
];
