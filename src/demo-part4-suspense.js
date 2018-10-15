class Suspense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inSuspense: false
    };
  }
  componentDidCatch(err, info) {
    if (!err.then) throw err;

    this.setState({ inSuspense: true });

    const resume = () => {
      this.setState({ inSuspense: false });
    };

    err.then(resume, resume);
  }
  render() {
    return this.state.inSuspense ? null : this.props.children;
  }
}
