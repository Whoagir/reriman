from tasks.task_worker import AbstractTaskWorker


class TaskWorker(AbstractTaskWorker):
    def setup(self):
        self.vars['n'] = self.randint(3, 6)

    def get_b1(self):
        return self.vars['n']*3

    def get_b2(self):
        return self.vars['n']*5

    def get_b3(self):
        return self.vars['n']*8
