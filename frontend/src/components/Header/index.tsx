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
  TextField
} from '@mui/material';

import { FC, ReactNode, useMemo, useState } from "react";

import Logo from "../../assets/logo.png";

import RealTime from "./RealTime";

const { Title, Text } = Typography;

const { useToken } = theme;

type HeaderProps = {
  children: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
  const { token } = useToken();
  // Get responsive information。
  const { md } = useResponsive();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  //我加的新的内容
  const [emailError, setEmailError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
  };

  const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };
  //我加的新的内容
  const handleLoginSubmit = () => {
    return;
  };//如果全部通过就提交
  const handleRegisterSubmit = () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    if (!validatePassword(password)) {
      setPasswordError('Password must include at least one uppercase letter, one lowercase letter, and must be at least 8 characters long without special symbols.');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return; 
    }
    if (!validateEmail(email)){
      setEmailError("It is not correct email format.");
      return;
    }else{
      handleCloseRegisterDialog();
      console.log("Registration successful!");}
    
  };
  //我加的新的内容
  const validatePassword = (password: string) => {
    return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[_\W]).{8,}/.test(password);
  };//判断这个密码是不是复合包含至少一个大小写，并且至少八位数

  //我加的新的内容
  const validateEmail = (email:string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      <Button onClick={handleOpenLoginDialog}>Login</Button>
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
          <TextField autoFocus margin="dense" label="Username" type="text" fullWidth />
          <TextField margin="dense" label="Password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoginDialog}>Cancel</Button>
          <Button onClick={handleCloseLoginDialog} variant="contained" color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openRegisterDialog} onClose={handleCloseRegisterDialog}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Username" type="text" fullWidth />
          <TextField margin="dense" label="Password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} error={!!passwordError} helperText={passwordError}/>
          <TextField margin="dense" label="Confirm Password" type="confirmpassword" fullWidth onChange={(e) => setConfirmPassword(e.target.value)} error={!!confirmPasswordError} helperText={confirmPasswordError}/>
          <TextField margin='dense' label="Email" type="email" fullWidth onChange={(e) => setEmail(e.target.value)} error={!!emailError}  helperText={emailError}/>
        </DialogContent>
        <DialogActions>
          {/*这我也改了逻辑*/ }
          <Button onClick={handleCloseRegisterDialog}>Cancel</Button>
          <Button onClick={handleRegisterSubmit} variant="contained" color="primary">
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>


  );
};

export default Header;
