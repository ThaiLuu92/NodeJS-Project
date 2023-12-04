import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { sendConfirmationEmail } from "../../../Service/SendMail.Service";
import { AxiosError } from "axios";
import { errorMessageLogin } from "../../../Types/error.type";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [isSending, setIsSending] = useState(false);
  const [errorBackEnd, setError] = useState<errorMessageLogin>({
    msgEmail: "",
    msgPassword: "",
    msgUserName: "",
    msgConfirmPassword: "",
  });
  const handleResendConfirmation = async () => {
    setIsSending(true);
    try {
      // Call your API function to resend confirmation email
      await sendConfirmationEmail(formData);
      alert("Bạn dada gửi email xác nhận thành công");
      navigate("/ResetPassword");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMsg = error.response.data.errors as errorMessageLogin;
        setError(errorMsg);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "3px 3px 3px 4px rgba(0, 0, 0, 0.1)",
        padding: 2,
        marginBottom: 44,
        borderRadius: 5,
      }}
    >
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Xác nhận Email
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          Hãy kiểm tra email của bạn và xác nhận để hoàn tất đăng ký.
        </Typography>
        <form>
          <TextField
            error={errorBackEnd?.msgEmail ? true : false}
            helperText={errorBackEnd?.msgEmail}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Địa chỉ Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleResendConfirmation}
            disabled={isSending}
          >
            Gửi lại email xác nhận
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ConfirmEmail;
