import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
// import { FormInputProps } from "./FormInputProps";
export const InputMUI = ({
  name,
  control,
  label,
  rows = 1,
  type = "text",
}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          multiline={rows > 0}
          rows={rows > 0 ? rows : null}
          type={type}
        />
      )}
    />
  );
};
