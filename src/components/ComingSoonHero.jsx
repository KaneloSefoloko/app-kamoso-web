import { motion } from "framer-motion";

const ComingSoonHero = () => {
    return (
        <div className="flex items-center justify-center py-40 px-6">
            <div className="max-w-2xl w-full text-center">

                {/* TOP LINE */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex justify-center mb-6"
                >
                    <div className="h-[1px] w-24 bg-gray-300" />
                </motion.div>

                {/* MAIN TEXT */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-4xl font-light tracking-[0.3em] text-gray-500 uppercase"
                >
                    New Collection
                </motion.h1>

                {/* SUB TEXT */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mt-4 text-sm md:text-base text-gray-400 tracking-wide"
                >
                    Pieces are being curated. Check back soon.
                </motion.p>

                {/* SKELETON GRID */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="h-64 md:h-72 bg-gray-200 rounded-xl"
                        />
                    ))}
                </div>

                {/* BOTTOM LINE */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-[1px] bg-gray-300 mx-auto mt-12"
                />

                {/* FOOT NOTE */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-xs tracking-[0.2em] text-gray-300 uppercase"
                >
                    Stay tuned — something special is coming
                </motion.p>

            </div>
        </div>
    );
};

export default ComingSoonHero;