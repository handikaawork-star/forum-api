class HelloHandler {
  constructor() {
    this.getHelloHandler = this.getHelloHandler.bind(this);
  }

  async getHelloHandler(req, res) {
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Hello World',
      },
    });
  }
}

export default HelloHandler;
