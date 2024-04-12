import { Box } from '@mantine/core';

interface Props {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-screen w-full">
      <div className="grid h-full grid-cols-1 overflow-y-auto lg:grid-cols-5">
        <div className="col-start-1 col-end-5 flex flex-col bg-white lg:col-span-2 lg:col-start-1">
          <div className="mx-6 my-auto w-auto">{children}</div>
        </div>
        <Box
          component="img"
          className="image hidden h-full w-full bg-cover bg-center lg:col-span-3 lg:col-start-3 lg:block"
          sx={{
            backgroundImage: `url('/assets/images/auth-cover.jpg')`,
            objectFit: 'contain',
          }}
          loading="lazy"
        ></Box>
      </div>
    </div>
  );
}
