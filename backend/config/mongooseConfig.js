const { connect } = require("mongoose");
const debug = require("debug")("terraferma:DDBB");

const connectionToDDBB = async () => {
  try {
    await connect(process.env.DDBB, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    debug("Database connection stablished");
  } catch (error) {
    debug(`Failed to connect: ${error.message}`);
    process.exit(1);
  }
};

connectionToDDBB();
