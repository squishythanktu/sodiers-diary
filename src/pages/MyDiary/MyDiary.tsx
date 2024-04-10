import { Box, Button, Checkbox, Grid, Group, ScrollArea, TextInput, Textarea } from '@mantine/core';
import DiaryCard from './DiaryCard';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AppContext } from 'src/contexts/app.context';
import { PaginationParams } from 'src/types/pagination-params.type';
import diaryApi from 'src/api/diary.api';

export default function MyDiary() {
  const { profile } = useContext(AppContext);
  const [paginationParams, __setPaginationParams] = useState<PaginationParams>({
    page: 1,
    size: 10,
  });
  const { data: diariesData } = useQuery({
    queryKey: [
      `diaries of user ${profile!.userName} in page ${paginationParams.page}`,
      profile?.userName,
      paginationParams,
    ],
    queryFn: () => diaryApi.getDiaries(paginationParams),
  });

  return (
    <Grid>
      <Grid.Col span={6} className="flex flex-col gap-2">
        <h3>Cảm xúc hiện tại của bạn thế nào?</h3>
        <Box className="flex w-full gap-2">
          <Checkbox.Group label="Tích cực:" size="md" className="h-full w-1/2">
            <Group mt="xs" className="flex flex-col items-start border-solid border-yellow-500 p-4">
              <Checkbox value="thich-thu" label="Thích thú" />
              <Checkbox value="svelte" label="Vui sướng" />
              <Checkbox value="vue" label="Phấn khởi" />
              <Checkbox value="ngd" label="Hạnh phúc" />
              <Checkbox value="ng" label="Lạc quan" />
            </Group>
          </Checkbox.Group>
          <Checkbox.Group label="Tiêu cực:" size="md" className="h-full w-1/2">
            <Group mt="xs" className="flex flex-col items-start border-solid border-blue-500 p-4">
              <Checkbox value="thich-thu" label="Mệt mỏi" />
              <Checkbox value="svelte" label="Lo lắng" />
              <Checkbox value="vue" label="Buồn bã" />
              <Checkbox value="ngd" label="Chán nản" />
              <Checkbox value="ng" label="Thất vọng" />
              <Checkbox value="ng" label="Căng thẳng" />
              <Checkbox value="ng" label="Bị áp lực" />
              <Checkbox value="ng" label="Chưa đoàn kết" />
            </Group>
          </Checkbox.Group>
        </Box>
        <Textarea size="md" label="Suy nghĩ" placeholder="Nhập suy nghĩ của bạn" />
        <TextInput size="md" label="Hashtag" placeholder="Nhập hashtag" mb="sm" />
        <Button variant="filled" className="w-fit">
          Cập nhật
        </Button>
      </Grid.Col>
      <Grid.Col span={6}>
        <ScrollArea h={500} className="flex flex-col">
          {diariesData?.data.map((data) => (
            <DiaryCard key={data.id} data={data} />
          ))}
        </ScrollArea>
      </Grid.Col>
    </Grid>
  );
}
