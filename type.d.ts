interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface CustomButtonProps {
  onPress?: () => void;
  title: string;
  className?: string;
  textStyle?: string;
  leftIcon?: any;
  isLoading?: boolean;
}

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

export { CustomInputProps, CustomButtonProps, CreateUserParams, SignInParams };
