module.exports = {
	createTransport: jest.fn(() => ({ sendMail: jest.fn() })),
	sendMail: jest.fn(),
};
