import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { NoMatch, ErrorBoundary, SideNav } from 'components';
import { Layout } from 'antd';

import 'styles/globals';
import 'axui-datagrid/style.scss'; // or style.css

import { Introduction, Usage } from 'pages/start';
import { Examples } from 'pages/examples';

class App extends React.Component {
  state = {
    leftMenuWidth: 250,
  };

  render() {
    const { leftMenuWidth } = this.state;

    const contentStyles = {
      marginLeft: leftMenuWidth,
      minWidth: '550px',
      maxWidth: '1150px',
    };

    const RedirectIntro = () => <Redirect to="/introduction" />;
    const RedirectExampleRoot = () => <Redirect to="/examples/LargeData" />;
    const RedirectExample = (p: RouteComponentProps<any>) => (
      <Examples {...p} />
    );

    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Layout>
            <SideNav leftMenuWidth={leftMenuWidth} />
            <Layout style={contentStyles}>
              <Layout.Content>
                <Switch>
                  <Route path="/introduction" component={Introduction} />
                  <Route path="/usage" component={Usage} />
                  <Route path="/examples/:name" component={RedirectExample} />
                  <Route path="/examples" component={RedirectExampleRoot} />
                  <Route path="/" component={RedirectIntro} />
                  <Route component={NoMatch} />
                </Switch>
              </Layout.Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
