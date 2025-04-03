import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, spacing, typography, borderRadius } from '../theme';

type RootStackParamList = {
  Home: undefined;
  Services: undefined;
  Contact: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBar}>
            <View style={styles.logoBarGradient} />
            <View style={styles.logoBarSolid} />
          </View>
          <Text style={styles.logoText}>FORTRESS</Text>
          <Text style={styles.logoSubText}>TAX & TRUST</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clientPortalButton}>
            <Text style={styles.clientPortalButtonText}>Client portal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={[styles.heroTitle, typography.h1]}>Together, we thrive.</Text>
          <Text style={[styles.heroSubtitle, typography.body]}>
            Dive into our 2024 Audit Innovation Survey to understand barriers and expectations in the industry.
          </Text>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreButtonText}>LEARN MORE</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: 'https://placehold.co/747x671' }}
          style={styles.heroImage}
        />
      </View>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <Text style={[styles.sectionTitle, typography.h1]}>Our services</Text>
        <Text style={styles.sectionDescription}>
          At the heart of Qatar's economic vision, our business offerings play a pivotal role in advancing your business, aligning seamlessly with the nation's overarching strategy for economic growth and diversification.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.medium,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logoBar: {
    flexDirection: 'row',
    height: 52.12,
  },
  logoBarGradient: {
    width: 19.56,
    backgroundColor: colors.secondary,
  },
  logoBarSolid: {
    width: 19.56,
    backgroundColor: colors.primary,
  },
  logoText: {
    color: colors.primary,
    fontSize: 23.04,
    fontFamily: fonts.agencyFB.bold,
  },
  logoSubText: {
    color: colors.primary,
    fontSize: 8.57,
    fontFamily: fonts.inter.regular,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  loginButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.black,
  },
  loginButtonText: {
    color: colors.black,
    fontSize: typography.body.fontSize,
    fontFamily: fonts.inter.regular,
    textTransform: 'capitalize',
  },
  clientPortalButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  clientPortalButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontFamily: fonts.inter.regular,
    textTransform: 'capitalize',
  },
  heroSection: {
    flexDirection: 'row',
    padding: spacing.lg,
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    paddingRight: spacing.lg,
  },
  heroTitle: {
    fontFamily: fonts.inter.semiBold,
    textTransform: 'capitalize',
    marginBottom: spacing.lg,
  },
  heroSubtitle: {
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  learnMoreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    width: 160,
    alignItems: 'center',
  },
  learnMoreButtonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontFamily: fonts.inter.regular,
    textTransform: 'uppercase',
  },
  heroImage: {
    width: 747,
    height: 671,
    resizeMode: 'contain',
  },
  servicesSection: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.white,
    fontFamily: fonts.inter.semiBold,
    textTransform: 'capitalize',
    marginBottom: spacing.lg,
  },
  sectionDescription: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.inter.regular,
    lineHeight: 28,
  },
});

export default HomeScreen; 