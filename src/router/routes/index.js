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
import ArticlesAdds from "../../pages/Articles-adds";
import ArticlesView from "../../views/articles/view";
import CoursesList from "../../pages/CoursesList";
import CoursesAdd from "../../views/courses/add";
import CoursesView from "../../views/courses/view";
import ArticlesLists from "../../views/articles/list";
import UserList from "../../pages/UserList";
import UsersView from "../../views/users/view";
import AssisranceWork from "../../views/Level 3/AssistanceWork/AssistanceWorkList";

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
  // {
  //   element: <EmailApp />,
  //   path: '/apps/email',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <EmailApp />,
  //   path: '/apps/email/:folder',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <EmailApp />,
  //   path: '/apps/email/label/:label',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <EmailApp />,
  //   path: '/apps/email/:filter'
  // },
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
    path: "/articles-view",
    element: <ArticlesView />,
  },
  {
    path: "/AssWork",
    element: <AssisranceWork />,
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

  // {
  //   element: <CommentsList />,
  //   path: '/apps/email',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <CommentsList />,
  //   path: '/apps/email/:folder',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <CommentsList />,
  //   path: '/apps/email/label/:label',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <CommentsList />,
  //   path: '/apps/email/:filter'
  // },
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
