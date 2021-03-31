import React from 'react'
import { Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

// const Login = React.lazy(_ => import('@/pages/login'))

// const Admin = React.lazy(_ => import('@/pages/admin'))
// const AddArticle = React.lazy(_ => import('@/pages/admin/c-pages/add-article'))
// const ArticleList = React.lazy(_ => import('@/pages/admin/c-pages/article-list'))
// const Workbanch = React.lazy(_ => import('@/pages/admin/c-pages/workbanch'))
// const CommentBoard = React.lazy(_ => import('@/pages/admin/c-pages/comment-board'))

const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  } else {
    return null
  }
}

function loadUrl(params) {
  return Loadable({ loader: _ => params, loading: MyLoadingComponent})
}

const Login = Loadable({ loader: _ => import('@/pages/login'), loading: MyLoadingComponent})

const Admin = Loadable({ loader:_ => import('@/pages/admin'), loading: MyLoadingComponent})
const AddArticle = Loadable({ loader:_ => import('@/pages/admin/c-pages/add-article'), loading: MyLoadingComponent})
const ArticleList = Loadable({ loader:_ => import('@/pages/admin/c-pages/article-list'), loading: MyLoadingComponent})
const Workbanch = Loadable({ loader:_ => import('@/pages/admin/c-pages/workbanch'), loading: MyLoadingComponent})
const CommentBoard = Loadable({ loader:_ => import('@/pages/admin/c-pages/comment-board'), loading: MyLoadingComponent})
const Member = loadUrl(import('@/pages/admin/c-pages/member'))


// const Login = rae

const routes = [
  {
    path: '/',
    exact: true,
    render: () => (
      <Redirect to="/login" />
    )
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: Admin,
    routes: [
      {
        path: '/admin',
        exact: true,
        render: () => (
          <Redirect to="/admin/workbanch" />
        )
      },
      {
        path: '/admin/articleList/:page',
        component: ArticleList,
      },
      {
        path: '/admin/addArticle',
        exact: true,
        component: AddArticle
      },
      {
        path: '/admin/addArticle/:id',
        component: AddArticle
      },
      {
        path: '/admin/workbanch',
        component: Workbanch
      },
      {
        path: '/admin/commentBoard/:page',
        component: CommentBoard,
      },
      {
        path: '/admin/member/:page',
        component: Member
      }
    ]
  },
]

export default routes