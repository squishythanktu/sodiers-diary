import { Box, Button, Card, Grid, Group, Radio, ScrollArea, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import diaryApi from 'src/api/diary.api';
import reactionApi from 'src/api/reaction.api';
import { AppContext } from 'src/contexts/app.context';
import { Diary } from 'src/types/diary.type';
import { PaginationParams } from 'src/types/pagination-params.type';
import DiaryCard from './DiaryCard';
import { toast } from 'react-toastify';

export default function MyDiary() {
  const { profile } = useContext(AppContext);
  const [paginationParams, __setPaginationParams] = useState<PaginationParams>({
    page: 1,
    size: 10,
  });
  const [selectedPositive, setSelectedPositive] = useState('');
  const [selectedNegative, setSelectedNegative] = useState('');
  const diaryForm = useForm<Diary>({
    initialValues: {
      userId: profile?.id as number,
      description: '',
      hashtag: '',
      reactionId: 0,
    },
  });
  const { data: diariesData, refetch } = useQuery({
    queryKey: [
      `diaries of user ${profile!.userName} in page ${paginationParams.page}`,
      profile?.userName,
      paginationParams,
    ],
    queryFn: () => diaryApi.getDiaries(paginationParams),
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

  const handlePositiveChange = (value: string) => {
    setSelectedPositive(value);
    setSelectedNegative('');
  };

  const handleNegativeChange = (value: string) => {
    setSelectedNegative(value);
    setSelectedPositive('');
  };

  const createDiaryMutation = useMutation({
    mutationFn: (data: Diary) => diaryApi.createDiary(data),
  });

  const handleCreateDiary = (values: Diary) => {
    const formatedData: Diary = {
      ...values,
      reactionId:
        positiveData?.data.find((data) => data.name === selectedPositive)?.id ||
        negativeData?.data.find((data) => data.name === selectedNegative)?.id ||
        0,
    };

    createDiaryMutation.mutate(formatedData, {
      onSuccess: () => {
        toast.success('Create diary successfully.');
        refetch();
      },
      onError: () => {
        toast.error('Create diary failed.');
      },
    });
  };

  return (
    <Grid>
      <Grid.Col span={6}>
        <form onSubmit={diaryForm.onSubmit(handleCreateDiary)}>
          <Card className="flex flex-col gap-2" padding="lg" radius="md" withBorder>
            <h3 className="my-0">
              Cảm xúc hiện tại của bạn thế nào? <span className="text-red-500">*</span>
            </h3>
            <Box className="flex w-full gap-2">
              <Group className="flex h-full w-1/2 flex-col gap-0">
                <p className="w-full text-start font-bold">Tích cực</p>
                <Radio.Group
                  mt="xs"
                  className="mt-0 flex w-full flex-col items-start gap-4 border-solid border-yellow-500 p-4"
                  value={selectedPositive}
                  onChange={handlePositiveChange}
                >
                  {positiveData?.data.map((reaction) => (
                    <Radio key={reaction.name} value={reaction.name} label={reaction.name} />
                  ))}
                </Radio.Group>
              </Group>
              <Group className="flex h-full w-1/2 flex-col gap-0">
                <p className="w-full text-start font-bold">Tiêu cực</p>
                <Radio.Group
                  mt="xs"
                  className="mt-0 flex w-full flex-col items-start gap-4 border-solid border-blue-500 p-4"
                  value={selectedNegative}
                  onChange={handleNegativeChange}
                >
                  {negativeData?.data.map((reaction) => (
                    <Radio key={reaction.name} value={reaction.name} label={reaction.name} />
                  ))}
                </Radio.Group>
              </Group>
            </Box>
            <Textarea
              size="md"
              label="Suy nghĩ"
              placeholder="Nhập suy nghĩ của bạn"
              {...diaryForm.getInputProps('description')}
            />
            <TextInput
              size="md"
              label="Hashtag"
              placeholder="Nhập hashtag"
              mb="sm"
              {...diaryForm.getInputProps('hashtag')}
            />
            <Button type="submit" variant="filled" className="ml-auto flex">
              Cập nhật
            </Button>
          </Card>
        </form>
      </Grid.Col>
      <Grid.Col span={6}>
        <ScrollArea h={710} className="flex flex-col">
          {diariesData?.data.map((data) => (
            <DiaryCard key={data.id} data={data} />
          ))}
        </ScrollArea>
      </Grid.Col>
    </Grid>
  );
}
