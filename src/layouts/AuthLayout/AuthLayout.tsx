import { Box } from '@mantine/core';

interface Props {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-screen w-full">
      <div className="relative grid h-full grid-cols-1 overflow-y-auto lg:grid-cols-5">
        <div className="absolute bottom-[12%] right-[25%] flex w-[340px] flex-col">
          <div className="mx-6 my-auto w-auto">{children}</div>
        </div>
        <Box
          component="img"
          className="image hidden h-full w-full bg-contain bg-center bg-no-repeat lg:col-span-5 lg:block"
          sx={{
            backgroundImage: `url('/assets/images/auth-cover.jpg')`,
          }}
          loading="lazy"
        ></Box>
      </div>
    </div>
  );
}
