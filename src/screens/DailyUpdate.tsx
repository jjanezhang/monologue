import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase';

const DailyUpdate: React.FC = () => {
  const [transcription, setTranscription] = useState<string | null>(null);

  const saveTranscription = async (text: string) => {
    const { data, error } = await supabase
      .from('transcriptions')
      .insert([{ text }]);

    if (error) console.error(error);
    else setTranscription(text);
  };

  return (
    <View>
      <Button
        title="Save Transcription"
        onPress={() => saveTranscription("Hello world")}
      />
      {transcription && <Text>{transcription}</Text>}
    </View>
  );
};

export default DailyUpdate;
