import { useResponsive } from "ahooks";
import {
  Col,
  ConfigProvider,
  Image,
  Row,
  Space,
  theme,
  Typography,
} from "antd";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import {
  FC,
  ReactNode,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import Logo from "../../assets/logo.png";

import RealTime from "./RealTime";
import axios from "axios";

const { Title, Text } = Typography;

const { useToken } = theme;

type HeaderProps = {
  children: ReactNode;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const Header: FC<HeaderProps> = ({ children, isLoggedIn, setIsLoggedIn }) => {
  const { token } = useToken();
  // Get responsive information。
  const { md } = useResponsive();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  //register verify
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  //login
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUsernameError, setLoginUsernameError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");

  const handleOpenLoginDialog = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setOpenLoginDialog(true);
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("User Log Off successfully")
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  //我加的新的内容
  const handleLoginSubmit = () => {
    const loginData = {
      username: loginUsername,
      password: loginPassword,
    };
    const resetInputsAndErrors = () => {
      setLoginUsernameError("");
      setLoginPasswordError("");
      setLoginPassword("");
      setLoginUsername("");
    };
    console.log(loginData)
    axios.post("https://project-group-fuzzy-foxes-trendy-api.onrender.com/login", loginData)
    .then((response) => {
      const { data } = response;
      console.log(data)
      switch (data) {
        case "User not found":
          setLoginUsernameError("User not found");
          localStorage.setItem('password', loginPassword);
          localStorage.setItem('username', loginUsername);
          break;
        case "Incorrect password":
          localStorage.setItem('username', loginUsername);
          localStorage.setItem('password', loginPassword);
          setLoginUsernameError("");
          setLoginPasswordError("Your password is not correct.");
          break;
        case "Login successful":
          setIsLoggedIn(true);
          resetInputsAndErrors();
          localStorage.removeItem('username');
          localStorage.removeItem('password'); 
          alert("Login successful");
          handleCloseLoginDialog();
          break;
        default:
          alert("Unexpected response from server");
      }
    })
    .catch(error => {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    });
  };
  //register
  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
  };

  const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };
  const handleRegisterSubmit = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setUsernameError("");
    let isVaild = true;
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must include at least one uppercase letter, one lowercase letter, and must be at least 8 characters long without special symbols."
      );
      isVaild = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isVaild = false;
    }
    if (!validateEmail(email)) {
      setEmailError("Please input correct email format.");
      isVaild = false;
    }
    if (!validateUsername(username)) {
      setUsernameError(
        "Username must be at least 4 characters long and contain only alphanumeric characters."
      );
      isVaild = false;
    }
    if (!isVaild) {
      return;
    }
    handleCloseRegisterDialog();
    const userData = {
      username: username,
      email: email,
      password: password,
    };

    // send POST request
    axios.post("https://project-group-fuzzy-foxes-trendy-api.onrender.com/register", userData).then((response) => {
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setUsernameError("");
      if (response.data === "Username or email already exists") {
        setUsernameError(response.data);
        alert(response.data)
      }
      if (response.data === "User registered successfully") {
        alert(response.data);
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setUsernameError("");
      }
      // deal with response data
    });
  };

  //这一块儿得换成提交到后端的代码
  //我加的新的内容
  //判断这个密码是不是复合包含至少一个大小写，并且至少八位数
  const validatePassword = (password: string) => {
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[_\W]).{8,}/.test(password);
  };

  //我加的新的内容
  //判断EMAIL是不是符合EMAIL规范
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z\d]{4,}$/;
    return usernameRegex.test(username);
  };

  /**
   * @description:Render subtext
   */
  const renderSecondary = (text: string) => (
    <Text type="secondary" style={{ fontSize: 12 }}>
      {text}
    </Text>
  );
  /**
   * @description: render logo and title
   */
  const renderTitle = useMemo(
    () => (
      <Space>
        <Image src={Logo} alt="Trendy" width={50} height={50} preview={false} />
        <Space direction="vertical" size={0} style={{ display: "flex" }}>
          <ConfigProvider
            theme={{
              components: {
                Typography: {
                  titleMarginBottom: 0,
                  // 此 Token 不生效
                  titleMarginTop: 0,
                },
              },
            }}
          >
            <Title level={4} style={{ marginTop: 0 }}>
              Trendy
            </Title>
          </ConfigProvider>
          {renderSecondary(
            "Gather all the hottest topics from across the internet."
          )}
        </Space>
      </Space>
    ),
    []
  );

  const renderButtons = (
    <Space>
      <Button onClick={handleOpenLoginDialog}>
        {isLoggedIn ? "LogOff" : "LogIn"}
      </Button>
      <Button onClick={handleOpenRegisterDialog}>Signup</Button>
    </Space>
  );

  return (
    <div
      id="hot-header"
      style={{
        background: token.colorBgContainer,
        boxShadow: token.boxShadowTertiary,
      }}
    >
      {md ? (
        <Row align="middle">
          {/* title */}
          <Col span={8}>{renderTitle}</Col>
          {/* update date */}
          <Col span={8}>
            <RealTime />{" "}
          </Col>

          {/* theme color */}
          <Col span={8}>
            {children}

            {renderButtons}
          </Col>
        </Row>
      ) : (
        <Row wrap={false}>
          {/* title */}
          <Col flex="auto">{renderTitle}</Col>

          {/* theme color */}
          <Col flex="none">
            {children}
            {renderButtons}
          </Col>
        </Row>
      )}
      <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            onChange={(e) => setLoginUsername(e.target.value)}
            error={!!loginUsernameError}
            helperText={loginUsernameError}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setLoginPassword(e.target.value)}
            error={!!loginPasswordError}
            helperText={loginPasswordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoginDialog}>Cancel</Button>
          <Button
            onClick={handleLoginSubmit}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRegisterDialog} onClose={handleCloseRegisterDialog}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
            InputProps={{
              placeholder: "Username: 4+ characters, alphanumeric only.",
            }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              placeholder:
                "8+ characters with at least one uppercase, no symbols.",
            }}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              placeholder: "xxx@sample.com",
            }}
          />
        </DialogContent>
        <DialogActions>
          {/*这我也改了逻辑*/}
          <Button onClick={handleCloseRegisterDialog}>Cancel</Button>
          <Button
            onClick={handleRegisterSubmit}
            variant="contained"
            color="primary"
          >
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Header;
