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
  content: () => {
    const div = document.createElement('div');
    const newId = `${this.id}-node`;
    div.id = newId;
    this.content.append(div);
  },
  callback: () => {
    this.content.style.padding = '10px';
    const maxHeight = window.innerHeight - (window.innerHeight * 30) / 100;
    this.content.style.maxHeight = `${maxHeight}px`;
    this.content.style.maxWidth = `${window.innerWidth - 20}px`;
  },
  onclosed: () => {}
};
