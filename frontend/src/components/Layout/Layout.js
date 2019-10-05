import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import classes from "./Layout.module.scss";

class Layout extends React.PureComponent {
  render() {
    return (
      <div className={classes.LayoutRoot}>
        <Header></Header>
        <div className={classes.MainWrap}>
          {/* central section */}
          <section className={classes.MainContainer}>
            <main className={classes.Main}>{this.props.children}</main>
          </section>
          {/* footer */}
          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;
