import { Card, Group, Badge, Text } from '@mantine/core';

export default function DiaryCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>
      <Group className="flex justify-between" mb="xs">
        <Text fw={800} color="red">
          19/02
        </Text>
        <Text fw={800} color="red">
          20/03/2021
        </Text>
      </Group>

      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        <strong>Bạn đang cảm thấy: </strong>
        <span>Hạnh phúc</span>
      </Text>
      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        <strong>Lý do: </strong>
        <span>Các học viên có rất nhiều cố gắng trong hội thi</span>
      </Text>
      <Group className="flex justify-between" mt="xs">
        <Text size="sm" c="dimmed">
          <strong>Hashtag: </strong>
        </Text>
        <Badge color="blue">hoithaotieudoan</Badge>
      </Group>
    </Card>
  );
}
