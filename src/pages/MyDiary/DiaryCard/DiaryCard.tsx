import { Badge, Card, Group, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import reactionApi from 'src/api/reaction.api';
import { Diary } from 'src/types/diary.type';

interface DiaryCardProps {
  data: Diary;
}

export default function DiaryCard({ data }: DiaryCardProps) {
  const { data: reactionData } = useQuery({
    queryKey: ['get all reactions'],
    queryFn: () => reactionApi.getAllReactions(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>
      <Group className="flex justify-between" mb="xs">
        <Text fw={800} color="red">
          {dayjs(data.createdAt).format('DD/MM/YYYY')}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        <strong>Bạn đang cảm thấy: </strong>
        {reactionData && reactionData.data && (
          <span>{reactionData.data.find((reaction) => reaction.id === data.reactionId)?.name}</span>
        )}
      </Text>
      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        <strong>Lý do: </strong>
        <span>{data.description}</span>
      </Text>
      <Group className="flex gap-4" mt="xs">
        <Text size="sm" c="dimmed">
          <strong>Hashtag: </strong>
        </Text>
        <Badge color="blue">{data.hashtag}</Badge>
      </Group>
    </Card>
  );
}
