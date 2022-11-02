import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history'

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        {/* default: contains containsだとurlにpathが"含まれる場合飛ばされる" */}
        <Route path="/streams/new" exact component={StreamCreate} />
        {/* :変数で必須 :変数?でoptional*/}
        <Route path="/streams/edit/:id/:hoge?" exact component={StreamEdit} />
        <Route path="/streams/delete/:id" exact component={StreamDelete} />
        <Route path="/streams/show" exact component={StreamShow} />
        <Route path="/" exact component={StreamList} />
      </Router>
    </div>
  )
}

export default App;
