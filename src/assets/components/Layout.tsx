import React, { Component } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export class Layout extends Component<LayoutProps> {
  render() {
    const { children } = this.props;
    return (
      <section className="w-screen h-screen flex flex-col overflow-auto text-white bg-gray-800">
        {children}
      </section>
    );
  }
}

export default Layout;
