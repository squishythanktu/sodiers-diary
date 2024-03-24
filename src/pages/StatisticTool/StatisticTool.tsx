import { Badge, Box, Button, Grid, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

export default function StatisticTool() {
  const statisticForm = useForm({
    initialValues: {
      dateRange: undefined,
      battalionId: 0,
    },
  });

  const handleSubmitStatisticForm = () => {};

  return (
    <Box className="flex flex-col gap-4">
      <h2 className="my-4 text-center uppercase">Công cụ thống kê: cảm xúc</h2>
      <form
        onSubmit={statisticForm.onSubmit(handleSubmitStatisticForm)}
        className="flex w-full flex-col gap-4"
      >
        <Grid gutter="xl">
          <Grid.Col span={6}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-48 font-bold">Chọn phạm vi</span>
              <Select
                placeholder="Đại đội"
                data={['Đại đội 1', 'Đại đội 2']}
                className="w-full"
                {...statisticForm.getInputProps('battalionId')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={12}>
            <div className="profile-field flex items-center gap-4">
              <span className="w-48 font-bold">Chọn khoảng thời gian</span>
              <DatePickerInput
                placeholder="Chọn khoảng thời gian"
                type="range"
                className="w-80"
                {...statisticForm.getInputProps('dateRange')}
              />
            </div>
          </Grid.Col>
        </Grid>
        <Button className="ml-auto w-fit" type="submit">
          Thống kê
        </Button>
      </form>
      <Grid gutter="xl">
        <Grid.Col span={6}>
          <Box className="flex flex-col gap-4">
            <Box className="rounded-lg border-[2px] border-solid border-yellow-600 p-1 text-center">
              Theo cảm xúc
            </Box>
            <Grid>
              <Grid.Col className="flex flex-col gap-4" span={6}>
                <Box className="rounded-lg border-[2px] border-solid border-yellow-600 p-1 text-center">
                  Tích cực
                </Box>
                <Box className="flex flex-col gap-4 rounded-lg border-[2px] border-solid border-yellow-600 p-4 text-center">
                  <Badge className="w-fit" color="orange">
                    Thích thú
                  </Badge>
                  <Badge className="w-fit" color="orange">
                    Vui sướng
                  </Badge>
                  <Badge className="w-fit" color="orange">
                    Phấn khởi
                  </Badge>
                  <Badge className="w-fit" color="orange">
                    Hạnh phúc
                  </Badge>
                  <Badge className="w-fit" color="orange">
                    Lạc quan
                  </Badge>
                </Box>
              </Grid.Col>
              <Grid.Col className="flex flex-col gap-4" span={6}>
                <Box className="rounded-lg border-[2px] border-solid border-blue-600 p-1 text-center">
                  Tiêu cực
                </Box>
                <Box className="flex flex-col gap-4 rounded-lg border-[2px] border-solid border-blue-600 p-4 text-center">
                  <Badge className="w-fit">Mệt mỏi</Badge>
                  <Badge className="w-fit">Lo lắng</Badge>
                  <Badge className="w-fit">Buồn bã</Badge>
                  <Badge className="w-fit">Chán nản</Badge>
                  <Badge className="w-fit">Thất vọng</Badge>
                  <Badge className="w-fit">Căng thẳng</Badge>
                  <Badge className="w-fit">Bị áp lực</Badge>
                  <Badge className="w-fit">Chưa đoàn kết</Badge>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box className="flex flex-col gap-4">
            <Box className="rounded-lg border-[2px] border-solid border-yellow-600 p-1 text-center">
              Theo hashtag
            </Box>
            <Box className="flex flex-col gap-4 rounded-lg border-[2px] border-solid border-yellow-600 p-4">
              <h3 className="m-0">Chọn hashtag:</h3>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
