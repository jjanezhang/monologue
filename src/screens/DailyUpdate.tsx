import React, {useState} from 'react'
import {View, Button, Text, StyleSheet} from 'react-native'
import {supabaseService} from '../services/supabaseService'

const DailyUpdate: React.FC = () => {
  const [transcription, setTranscription] = useState<string | null>(null)

  const saveTranscription = async (text: string) => {
    console.log('Saving daily update with content:', text)
    try {
      const {data, error} = await supabaseService.createDailyUpdate({
        content: text,
      })

      if (error) {
        console.error('Error saving daily update:', error)
      } else {
        console.log('Successfully saved daily update:', data)
        setTranscription(text)
      }
    } catch (err) {
      console.error('Exception while saving daily update:', err)
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Save Transcription"
        onPress={() => saveTranscription('Hello world')}
      />
      {transcription && <Text style={styles.text}>{transcription}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
  },
})
export default DailyUpdate
