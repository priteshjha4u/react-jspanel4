export default {
  theme: 'primary',
  headerTitle: 'Default Title',
  position: 'center-top 0 20%',
  contentSize: {
    width: `${Math.round(window.innerWidth / 3)}px`,
    height: `auto`
  },
  contentOverflow: 'auto',
  onwindowresize: false,
  content: function() {
    const div = document.createElement('div');
    const newId = `${this.id}-node`;
    div.id = newId;
    this.content.append(div);
  },
  callback: function(app) {
    this.content.style.padding = '10px';
    const maxHeight = window.innerHeight - (window.innerHeight * 30) / 100;
    this.content.style.maxHeight = `${maxHeight}px`;
    this.content.style.maxWidth = `${window.innerWidth - 20}px`;
    // keep the added jsPanel id in main component state for further use if any.
    app.setState({ panels: { ...app.state.panels, [action]: this } });
    // app.bodyOverflowHidden();
  },
  onclosed: function(app) {
    // remove closed jsPanel and its mounted component from state
    const appPanels = app.state.panels;
    if (appPanels[action]) {
      delete appPanels[action];
      app.setState({ panels: { ...appPanels } }, () => {
        // setTimeout(app.bodyOverflowHidden);
      });
    }
  }
};
