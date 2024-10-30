import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColors from '../../theme/color';
import {Button, Divider} from '@ui-kitten/components';
import moment from 'moment';
import {setCategory} from '../../utils/function';
import {status, taskValues} from '../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetail = ({route}) => {
  const {item} = route?.params;

  /**Silme işlemi için */
  const deleteTask = async () => {
    try {
      /**Mevcut görevleri al */
      const savedTasks = await AsyncStorage.getItem('tasks');

      if (savedTasks === null) {
        return; /**Kayıtlı görrv yoksa fonk. durdur */
      }

      const tasks = JSON.parse(savedTasks);

      /**Silinecek görevi filtrele */
      const filteredTasks = tasks.filter(task => task.id !== item.id);

      /**Filtrelenmiş görevleri depola */
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
      console.log(`👌 Görev Silindi `);
    } catch (error) {
      console.log('Görev silinirken hata oluştu :', error);
    }
  };

  /**Güncelleme işlemleri için */
  const updateTask = async newStatus => {
    try {
      /**Mevcut görevleri al */
      const savedTasks = await AsyncStorage.getItem('tasks');

      if (savedTasks === null) {
        return; /**kayıtlı görev yoksa fonksiyonu durdur */
      }

      const tasks = JSON.parse(savedTasks);

      /**Güncellenecek görevi bul */
      const updatedTask = tasks.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            status: newStatus /**Yeni durumu uygula */,
          };
        }
        return task;
      });
      /**güncellenmiş görevleri depola */
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTask));
      console.log('Görev Güncellendi', updatedTask);
    } catch (error) {
      console.log('Görev güncellenirken hata oluştu :', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Title :
          </Text>
          <Text style={{color: 'blue', fontWeight: 'bold'}}>{item.title}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Description :
          </Text>
          <Text style={{color: 'blue', fontWeight: 'bold'}}>
            {item.description}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Start Date :
          </Text>
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            {moment(item.startDate).format('YYYY/MM/DD')}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            End Date :
          </Text>
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            {moment(item.endDate).format('YYYY/MM/DD')}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Category :
          </Text>
          <Text style={{color: 'darkgreen', fontWeight: 'bold'}}>
            {setCategory(item.category)}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Status :
          </Text>
          <Text style={{color: 'purple', fontWeight: 'bold'}}>
            {taskValues.find(task => task.status === item?.status)?.title}
          </Text>
        </View>
        <Divider />
      </ScrollView>

      <View>
        <Button
          onPress={() => updateTask(status.PENDING)}
          style={styles.btn}
          status="primary">
          START
        </Button>
        <Button
          onPress={() => updateTask(status.COMPLETED)}
          style={styles.btn}
          status="success">
          COMPLATED
        </Button>
        <Button
          onPress={() => updateTask(status.CANCEL)}
          style={styles.btn}
          status="danger">
          CANCEL
        </Button>
        <Button onPress={deleteTask} style={styles.btn} status="warning">
          DELETE
        </Button>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
    padding: 10,
  },
  btn: {
    marginVertical: 5,
  },
});
