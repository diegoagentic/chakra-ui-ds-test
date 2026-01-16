import {
    Box, Flex, Text, IconButton, useColorMode, useColorModeValue, Image,
    Menu, MenuButton, MenuList, MenuItem, MenuDivider, Button, Avatar,
    Portal, SimpleGrid, VStack, Icon
} from '@chakra-ui/react'
import {
    FaHome, FaBox, FaChartLine, FaClipboardList, FaTh,
    FaSignOutAlt, FaUser, FaCheckCircle, FaCalendar, FaList, FaBriefcase
} from 'react-icons/fa'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import React from 'react'

function NavItem({ icon, label, isActive = false }: { icon: React.ElementType, label: string, isActive?: boolean }) {
    const activeColor = useColorModeValue("blue.600", "blue.400")
    const inactiveColor = useColorModeValue("gray.500", "gray.400")
    const bgHover = useColorModeValue("blackAlpha.50", "whiteAlpha.100")
    const bgActive = useColorModeValue("blackAlpha.50", "whiteAlpha.100")

    return (
        <Button
            variant="ghost"
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="9"
            px="3"
            rounded="full"
            bg={isActive ? bgActive : "transparent"}
            color={isActive ? activeColor : inactiveColor}
            _hover={{ bg: bgHover }}
            role="group"
            position="relative"
            overflow="hidden"
            transition="all 0.3s"
        >
            <Box as={icon} zIndex="1" />
            <Box
                as="span"
                ml={isActive ? "2" : "0"}
                maxW={isActive ? "200px" : "0"}
                opacity={isActive ? 1 : 0}
                overflow="hidden"
                whiteSpace="nowrap"
                transition="all 0.3s ease-in-out"
                fontSize="sm"
                fontWeight="medium"
                _groupHover={{ maxW: "200px", opacity: 1, ml: "2" }}
            >
                {label}
            </Box>
        </Button>
    )
}



function AppItem({ app }: { app: any }) {
    const bg = useColorModeValue(app.bg, app.darkBg)
    const highlightedBg = useColorModeValue('blue.50', 'whiteAlpha.100')
    const textColorSecondary = useColorModeValue('gray.600', 'gray.300')
    const textColorMain = useColorModeValue('gray.900', 'white')

    return (
        <VStack
            cursor="pointer"
            role="group"
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            bg={app.isHighlighted ? highlightedBg : 'transparent'}
            p={app.isHighlighted ? 2 : 0}
            onClick={app.onClick}
        >
            <Flex
                w="12" h="12"
                align="center" justify="center"
                rounded="xl"
                bg={bg}
                color={app.color}
                boxShadow="sm"
                mb="1"
                border={app.isHighlighted ? '2px solid' : 'none'}
                borderColor={app.isHighlighted ? 'blue.400' : 'transparent'}
            >
                <Box as={app.icon} boxSize="5" />
            </Flex>
            <Text fontSize="xs" fontWeight={app.isHighlighted ? "bold" : "medium"} color={app.isHighlighted ? "blue.500" : textColorSecondary} _groupHover={{ color: textColorMain }}>{app.label}</Text>
        </VStack>
    )
}

interface NavbarProps {
    onLogout: () => void;
    activeTab?: 'Overview' | 'Inventory' | 'Production' | 'Orders';
    onNavigateToWorkspace: () => void;
}

export default function Navbar({ onLogout, activeTab = 'Overview', onNavigateToWorkspace }: NavbarProps) {
    const { colorMode, toggleColorMode } = useColorMode()
    const ThemeIcon = colorMode === 'light' ? MoonIcon : SunIcon
    const [isAppsOpen, setIsAppsOpen] = useState(false)

    // Glassmorphism Styles
    const navBorder = useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.1)')
    const navShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.07)"
    const borderColor = useColorModeValue('gray.200', 'gray.800')
    const textColorMain = useColorModeValue('gray.900', 'white')
    const textColorSecondary = useColorModeValue('gray.600', 'gray.300')
    const appsMenuBg = useColorModeValue('rgba(255, 255, 255, 0.85)', 'rgba(23, 25, 35, 0.85)')
    const appsMenuBorderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

    return (
        <Box
            position="fixed"
            top="24px"
            left="50%"
            transform="translateX(-50%)"
            zIndex={100}
            w="auto"
            p="2"
            borderRadius="full"
            bg={useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(23, 25, 35, 0.7)')}
            backdropFilter="blur(24px)"
            border="1px solid"
            borderColor={navBorder}
            boxShadow={navShadow}
        >
            <Flex align="center" gap="2">
                {/* Logo */}
                <Box px="4">
                    <Image
                        src={useColorModeValue('/logo-on-light.jpg', '/logo-on-dark.jpg')}
                        h="20px"
                        alt="Strata"
                    />
                </Box>
                <Box w="1px" h="24px" bg={useColorModeValue('gray.300', 'whiteAlpha.300')} mx="1" />

                {/* Nav Items */}
                <Flex gap="1">
                    <NavItem icon={FaHome} label="Overview" isActive={activeTab === 'Overview'} />
                    <NavItem icon={FaBox} label="Inventory" isActive={activeTab === 'Inventory'} />
                    <NavItem icon={FaChartLine} label="Production" isActive={activeTab === 'Production'} />
                    <NavItem icon={FaClipboardList} label="Orders" isActive={activeTab === 'Orders'} />
                </Flex>

                <Box w="1px" h="24px" bg={useColorModeValue('gray.300', 'whiteAlpha.300')} mx="1" />

                {/* Actions */}
                <Flex align="center" gap="2" pr="2" position="relative">
                    <IconButton
                        aria-label="Apps"
                        icon={<FaTh />}
                        variant="ghost"
                        rounded="full"
                        size="sm"
                        color="gray.500"
                        _hover={{ bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100') }}
                        onClick={() => setIsAppsOpen(!isAppsOpen)}
                    />

                    {isAppsOpen && (
                        <Portal>
                            <Box
                                position="fixed"
                                inset="0"
                                bg="transparent"
                                zIndex={99}
                                onClick={() => setIsAppsOpen(false)}
                            />
                            <Box
                                bg={appsMenuBg}
                                backdropFilter="blur(16px)"
                                border="1px solid"
                                borderColor={appsMenuBorderColor}
                                w="400px"
                                borderRadius="2xl"
                                boxShadow="2xl"
                                p="6"
                                position="fixed"
                                top="90px"
                                left="50%"
                                transform="translateX(-50%)"
                                zIndex={100}
                                transition="all 0.2s"
                            >
                                <SimpleGrid columns={3} spacing="6">
                                    {[
                                        { icon: FaBriefcase, label: "My Work Space", color: "blue.600", bg: "blue.100", darkBg: "blue.800", isHighlighted: true, onClick: onNavigateToWorkspace },
                                        { icon: FaHome, label: "Portal", color: "blue.500", bg: "blue.50", darkBg: "blue.900" },
                                        { icon: FaUser, label: "CRM", color: "purple.500", bg: "purple.50", darkBg: "purple.900" },
                                        { icon: FaClipboardList, label: "Invoice", color: "green.500", bg: "green.50", darkBg: "green.900" },
                                        { icon: FaBox, label: "Inventory", color: "orange.500", bg: "orange.50", darkBg: "orange.900" },
                                        { icon: FaChartLine, label: "Analytics", color: "pink.500", bg: "pink.50", darkBg: "pink.900" },
                                        { icon: FaCheckCircle, label: "Support", color: "cyan.500", bg: "cyan.50", darkBg: "cyan.900" },
                                        { icon: FaTh, label: "Board", color: "indigo.500", bg: "indigo.50", darkBg: "indigo.900" },
                                        { icon: FaCalendar, label: "Calendar", color: "red.500", bg: "red.50", darkBg: "red.900" },
                                        { icon: FaList, label: "More", color: "gray.500", bg: "gray.100", darkBg: "gray.700" },
                                    ].map((app, i) => (
                                        <AppItem key={i} app={app} />
                                    ))}
                                </SimpleGrid>
                            </Box>
                        </Portal>
                    )}
                    <IconButton
                        aria-label="Toggle Theme"
                        icon={<ThemeIcon />}
                        onClick={toggleColorMode}
                        variant="ghost"
                        rounded="full"
                        size="sm"
                        color="gray.500"
                        _hover={{ bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100') }}
                    />
                    <Menu>
                        <MenuButton as={Button} rounded="full" w="32px" h="32px" minW="32px" p="0" variant="ghost" _hover={{ bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100') }}>
                            <Avatar size="xs" name="Jhon Doe" bgGradient="linear(to-r, blue.400, purple.500)" color="white" fontWeight="bold" />
                        </MenuButton>
                        <MenuList bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.900')} backdropFilter="blur(10px)" borderColor={borderColor} shadow="lg" p="2" borderRadius="xl">
                            <Box px="3" py="2">
                                <Text fontSize="sm" fontWeight="bold" color={textColorMain}>Jhon Doe</Text>
                                <Text fontSize="xs" color="gray.500">Admin</Text>
                            </Box>
                            <MenuDivider />
                            <MenuItem icon={<FaSignOutAlt />} onClick={onLogout} color="red.500" borderRadius="md">Sign Out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}
