import { Mail, Home, Airplay, Circle, User, Calendar, Book, Twitter, Trello, Codesandbox, BookOpen, Slack } from "react-feather";

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
    icon: <User size={20} />,
    children: [
      {
        id: "list",
        title: "لیست اخبار و مقالات",
        icon: <Circle size={12} />,
        navLink: "/articles-list",
      },
      {
        id: "add",
        title: "افزدون اخبار و مقاله",
        icon: <Circle size={12} />,
        navLink: "/articles-add",
      },
    ],
  },
  {
    id: "asswork",
    title: "مدیریت تسک",
    icon: <Calendar size={20} />,
    navLink: "/asswork",
  },
  {
    id: "Building",
    title: "ساختمان پژوهشگاه",
    icon: <Home size={20} />,
    navLink: "/building",
  },
  {
    id: "class-room",
    title: "کلاس ها",
    icon: <Book size={20} />,
    navLink: "/class-room",
  },
  {
    id: "course-assistance",
    title: "منتور ها",
    icon: <User size={20} />,
    navLink: "/course-assistance",
  },
  {
    id: "/course-socialgroup",
    title: "شبکه اجتماعی",
    icon: <Twitter size={20} />,
    navLink: "/course-socialgroup",
  },
  {
    id: "/department",
    title: "واحد های پژوهشگاه",
    icon: <Trello size={20} />,
    navLink: "/department",
  },
  {
    id: "/term",
    title: "ترم ها",
    icon: <Codesandbox size={20} />,
    navLink: "/term",
  },
  {
    id: "/status-courses",
    title: "وضعیت دوره ها",
    icon: <BookOpen size={20} />,
    navLink: "/status-courses",
  },
  {
    id: "/technology",
    title: "وضعیت تکنورلوژِی",
    icon: <Slack size={20} />,
    navLink: "/technology",
  },
  {
    id: "comment",
    title: "مدیریت کامنت ها",
    icon: <Mail size={20} />,
    navLink: "/comments",
  },
];
