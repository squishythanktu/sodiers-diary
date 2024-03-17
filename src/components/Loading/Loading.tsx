import { Box } from '@mantine/core';
import { Loader } from '@mantine/core';

export default function Loading() {
  return (
    <Box
      className="h-screen w-full"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader color="blue" />
    </Box>
  );
}
