import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";

import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

import PublicRoute from "@components/routes/PublicRoute";

import { isObjEmpty } from "@utils";
import Wizard from "../../views/courses/add";
import UserView from "../../views/courses/view";
import ArticlesView from "../../views/articles/view";
import CoursesList from "../../pages/CoursesList";
import CoursesAdd from "../../views/courses/add";
import CoursesView from "../../views/courses/view";
import ArticlesLists from "../../views/articles/list";
import UserList from "../../pages/UserList";
import UsersView from "../../views/users/view";
import AssisranceWork from "../../views/Level 3/AssistanceWork/AssistanceWorkList";
import BuildingList from "../../views/Level 3/Building/BuildingList";
import ClassRoomList from "../../views/Level 3/ClassRoom/ClassRoomList";
import CourseAssistanceList from "../../views/Level 3/CourseAssistance/CourseAssistanceList";
import CourseSocialGroupList from "../../views/Level 3/CourseSocialGroup/CourseSocialGroupList";
import DepartmentList from "../../views/Level 3/Department/DepartmentList";
import TermList from "../../views/Level 3/Term/TermList";
import StatusCoursesList from "../../views/Level 3/CourseStatus/StatusCoursesList";
import TechnologyList from "../../views/Level 3/Technology/TechnologyList";
import CalendarComponent from "../../views/calendar";
import CommentLists from "../../views/comments/list";
import ArticlesAdds from "../../pages/Articles-Adds";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

const TemplateTitle = "%s - Vuexy React Admin Template";

const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const ArticlesList = lazy(() => import("../../pages/ArticlesList"));
const SecondPage = lazy(() => import("../../pages/CoursesList"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));

const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/sample",
    element: <Sample />,
  },

  // Users
  {
    path: "/users",
    element: <UserList />,
  },
  {
    // path: "/users-view/:CourseId",
    path: "/users-view/:id",
    element: <UsersView />,
  },

  // Courses
  {
    path: "/courses-list",
    element: <CoursesList />,
  },
  {
    path: "/courses-add",
    element: <CoursesAdd />,
  },
  {
    path: "/courses-view/:id",
    element: <CoursesView />,
  },

  //  Articles
  {
    path: "/articles-list",
    element: <ArticlesList />,
  },
  {
    path: "/articles-add",
    element: <ArticlesAdds />,
  },
  {
    path: "/articles-view/:id",
    element: <ArticlesView />,
  },
  {
    path: "/asswork",
    element: <AssisranceWork />,
  },
  {
    path: "/building",
    element: <BuildingList />,
  },
  {
    path: "/class-room",
    element: <ClassRoomList />,
  },
  {
    path: "/course-assistance",
    element: <CourseAssistanceList />,
  },
  {
    path: "/course-socialgroup",
    element: <CourseSocialGroupList />,
  },
  {
    path: "/department",
    element: <DepartmentList />,
  },
  {
    path: "/term",
    element: <TermList />,
  },
  {
    path: "/status-courses",
    element: <StatusCoursesList />,
  },
  {
    path: "/technology",
    element: <TechnologyList />,
  },
  {
    path: "/calendar",
    element: <CalendarComponent />,
  },

  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },

  {
    element: <CommentLists />,
    path: "/comments",
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
