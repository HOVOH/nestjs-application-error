import { ApplicationErrorsFilter } from "./application-errors.filter";
import { ArgumentsHost } from "@nestjs/common";
import { createMock } from "@golevelup/ts-jest";
import { ApplicationError } from "./application.error";

describe("Application Error Filter", () => {
  const ERROR_CODE = "error_code";
  const STATUS_CODE = 500;
  const filter = new ApplicationErrorsFilter({
    [ERROR_CODE]: STATUS_CODE,
  })

  it("Should set the status code and error message", () => {
    const argumentHost = createMock<ArgumentsHost>();
    argumentHost.getType.mockReturnValue("http");
    const error = new ApplicationError(ERROR_CODE);
    filter.catch(error, argumentHost);
    expect(argumentHost.switchToHttp().getResponse<Response>().status).toHaveBeenCalledWith(STATUS_CODE);
  })
})
