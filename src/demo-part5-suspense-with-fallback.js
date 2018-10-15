class Suspense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: false,
      inSuspense: false
    };
  }
  componentDidCatch(err, info) {
    if (!err.then) throw err;

    setTimeout(
      () => this.setState({ timeout: true }),
      this.props.maxDuration || 0
    );

    this.setState({ inSuspense: true });

    const resume = () => {
      this.setState({ inSuspense: false, timeout: false });
    };

    err.then(resume, resume);
  }
  render() {
    if (this.state.timeout) return this.props.fallback || null;
    return this.state.inSuspense ? null : this.props.children;
  }
}
