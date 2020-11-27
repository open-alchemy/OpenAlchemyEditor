export const CONFIG = {
  domainName: "openalchemy.io",
  api: {
    recordName: "editor-v2.api",
    throttlingBurstLimit: 200,
    throttlingRateLimit: 100,
    additionalAllowHeaders: ["x-language"],
  },
  web: {
    recordName: "editor",
  },
  identity: {
    recordName: "login",
    localHostname: "http://localhost:4200",
    signInCompletePath: "/sign-in-complete",
    userVerification: {
      subject: "Verify your email for OpenAlchemy!",
      message:
        "Hello {username}, Thanks for signing up to OpenAlchemy! Your verification code is {####}",
    },
    userInvitation: {
      subject: "Invite to join OpenAlchemy!",
      message:
        "Hello {username}, You have been invited to join OpenAlchemy! Your temporary password is {####}",
    },
  },
};
