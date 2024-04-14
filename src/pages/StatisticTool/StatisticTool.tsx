import { Box, Button, Card, Grid, Select, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import diaryApi from 'src/api/diary.api';
import reactionApi from 'src/api/reaction.api';

export default function StatisticTool() {
  const [statisticRequest, setStatisticRequest] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
    reactionId: number | undefined;
    hashtag: string | undefined;
  }>({
    startDate: '',
    endDate: '',
    reactionId: 0,
    hashtag: '',
  });
  const statisticForm = useForm({
    initialValues: {
      dateRange: undefined,
      reactionId: 0,
      hashtag: '',
    },
  });
  const { data: statisticsData } = useQuery({
    
    queryKey: ['search diaries by statistic', statisticRequest],
    queryFn: () => diaryApi.searchDiariesByStatistics(statisticRequest),
    
  });
  const { data: positiveData } = useQuery({
    queryKey: ['positive reactions'],
    queryFn: () => reactionApi.getPositiveReactions(),
    staleTime: 5 * 60 * 1000,
  });
  const { data: negativeData } = useQuery({
    queryKey: ['negative reactions'],
    queryFn: () => reactionApi.getNegativeReactions(),
    staleTime: 5 * 60 * 1000,
  });

  const handleSubmitStatisticForm = (data: any) => {
    const formattedData = {
      reactionId:
        positiveData?.data.find((pr) => pr.name === data.reactionId)?.id ||
        negativeData?.data.find((nr) => nr.name === data.reactionId)?.id ||
        0,
      hashtag: data.hashtag,
      startDate: data.dateRange ? data.dateRange[0].toISOString() : null,
      endDate: data.dateRange ? data.dateRange[1].toISOString() : null,
      endDateAsDateTime: data.dateRange ? data.dateRange[1].toISOString() : null,
      startDateAsDateTime: data.dateRange ? data.dateRange[0].toISOString() : null,
    };
    setStatisticRequest(formattedData);
    statisticForm.reset()
  };

  return (
    <Box className="flex flex-col gap-4">
      <h2 className="my-4 text-center uppercase">Công cụ thống kê: cảm xúc</h2>
      <form
        onSubmit={statisticForm.onSubmit(handleSubmitStatisticForm)}
        className="flex w-full flex-col gap-4"
      >
        <Grid gutter="xl">
          <Grid.Col span={6}>
            <div className="statistic-field flex items-center gap-4">
              <span className="w-48 font-bold">Chọn khoảng thời gian</span>
              <DatePickerInput
                placeholder="Chọn khoảng thời gian"
                type="range"
                className="flex-grow"
                {...statisticForm.getInputProps('dateRange')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="statistic-field flex items-center gap-4">
              <span className="w-48 font-bold">Chọn cảm xúc</span>
              <Select
                searchable
                placeholder="Chọn cảm xúc"
                className="flex-grow"
                data={[
                  ...(positiveData?.data.map((r) => ({ value: r.name, label: r.name, group: 'Tích cực' })) ||
                    []),
                  ...(negativeData?.data.map((r) => ({ value: r.name, label: r.name, group: 'Tiêu cực' })) ||
                    []),
                ]}
                {...statisticForm.getInputProps('reactionId')}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="statistic-field flex items-center gap-4">
              <span className="w-48 font-bold">Nhập hashtag</span>
              <TextInput
                className="flex-grow"
                size="md"
                placeholder="Nhập hashtag"
                {...statisticForm.getInputProps('hashtag')}
              />
            </div>
          </Grid.Col>
        </Grid>
        <Button className="ml-auto w-fit" type="submit">
          Thống kê
        </Button>
      </form>
      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500}>Kết quả thống kê theo cảm xúc</Text>

            <Text size="sm" c="dimmed">
              {statisticsData?.data.map((data) => {
                if (!data.isReaction) return;
                return (
                  <p>
                    {data.elementName}: {data.quantity}
                  </p>
                );
              })}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500}>Kết quả thống kê theo hashtag</Text>
            <Text size="sm" c="dimmed">
              {statisticsData?.data.map((data) => {
                if (data.isReaction) return;
                return (
                  <p>
                    {data.elementName}: {data.quantity}
                  </p>
                );
              })}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
