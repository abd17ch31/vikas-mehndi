exports.handler = async (event) => {
  try {
    console.log("Incoming event:", event);

    // your existing code here
    const data = JSON.parse(event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success" }),
    };

  } catch (error) {
    console.error("FULL ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack, // 👈 THIS IS GOLD
      }),
    };
  }
};